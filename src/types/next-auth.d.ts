import NextAuth from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      data: {
        first_name: string;
        last_name: string;
        username: string;
        email: string;
      };
      status: string;
      message: string;
      token: string;
      exp: number;
    };
  }
}
