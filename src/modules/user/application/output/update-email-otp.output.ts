import { OtpPurpose } from '@/modules/auth/domain';

export type SucceessOtpSend = {
  status: string;
  message: string;
  data: {
    id: string;
    purpose: OtpPurpose;
  };
};
