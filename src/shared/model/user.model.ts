/**
 * 로그인 및 가입 객체
 */

export class UserModel {
    public id?: number = 0;
    public email: string = '';
    public username: string = '';
    public password: string = '';
    public role: string = '';
    public createDate?: Date | null = null;
    public updateDate?: Date | null = null;
}
