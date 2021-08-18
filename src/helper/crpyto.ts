import Argon2 from "argon2";

export const Crpyto = {
  doHash: async (password: string): Promise<string> => {
    const hashedPass = await Argon2.hash(password);
    return hashedPass;
  },
  isVerify: async (password: string, hashedPass: string) => {
    const result = await Argon2.verify(hashedPass, password);
    return result;
  },
};
