import {authProps, createUserProps, EmailInterface, userProps} from "../interfaces";
import userServices from "../services/userServices";
import {createPasswordHash, generateRandomChar, KeyPatternErrorResponse} from "../helpers";
import EmailProvider from "../events/EmailProvider";

export class Auth implements authProps {

    private static EmailInterface: EmailInterface = new EmailProvider();

    public create(payload: createUserProps): Promise<userProps> {

        return new Promise(async (resolve, reject) => {

            await userServices.createUser(payload).then(async (user: userProps) => {

                //send the welcome mail
                Auth.EmailInterface.send(user?.email, 'Welcome to My Youtube Channel', 'welcome', {name: user?.username});

                return resolve(user);
            }).
            catch((e) => {
                return reject({message: KeyPatternErrorResponse(e)})
            })
        })
    }

    public login(email: string, password: string): Promise<userProps> {

        return new Promise(async (resolve, reject) => {

            try {

                const user: userProps | null = await userServices.findByEmail(email);

                if (!user) return reject({message: 'Invalid email or password'});

                if (!(await userServices.verifyPassword(user.password, password))) return reject({message: 'Invalid email or password'});

                return resolve(user);
            }
            catch (e) {
                return reject(e);
            }
        })
    }

    public forgetPassword(email: string): Promise<userProps> {

        return new Promise(async (resolve, reject) => {

            const user: userProps | null = await userServices.findByEmail(email);

            if (!user) return reject({message: 'Invalid email'});

            console.log('yes');

            //send an email with the user otp....
            await Auth.EmailInterface.send(user.email, 'Welcome to Payluk Technologies', 'welcome', {name: user.username, otp: user.otp});

            //change the password Reset state to true
            await userServices.setPasswordResetState(user.id, true);

            return resolve(user);
        })
    }

    public updatePassword(email: string, password: string): Promise<userProps> {

        return new Promise(async (resolve, reject) => {

            const user: userProps | null = await userServices.findByEmail(email);

            const hash = createPasswordHash(password);

            if (user) {
                if (!user.passwordReset) return reject({message: 'You have not requested for a password reset'});

                //update password
                await userServices.updatePassword(user.id, hash);

                return resolve(user);
            }
            return reject({message: 'Invalid email'});
        })
    }

    public verifyOTP(email: string, otp: number): Promise<userProps> {

        return new Promise(async (resolve, reject) => {

            const user: userProps | null = await userServices.findByEmail(email);

            if (!user) return reject({message: 'Invalid email'});

            if (user.otp !== otp) return reject({message: 'Invalid OTP'});

            //reset the otp after verification....
            const newOTP = generateRandomChar(4);

            await userServices.setOTP(user.id, newOTP);

            return resolve(user);
        })
    }

    public authMiddleware(userId: string): Promise<userProps> {
        return new Promise(async (resolve, reject) => {

            const user: userProps | null = await userServices.findByUserId(userId);

            if (!user) return reject({message: 'Account not found'});

            return resolve(user);
        })
    }

}