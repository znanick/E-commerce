import i18next from '~/utils/localisation';

const { t } = i18next;

export const AUTH_ERRORS: Record<
  string,
  { email?: string; psw?: string; phone?: string; code?: string; repPsw?: string }
> = {
  'auth/invalid-email': { email: t('authMessages.invalidEmail'), psw: '', phone: '' },
  'auth/user-disabled': { email: t('authMessages.userDisabled'), psw: '', phone: '' },
  'auth/user-not-found': { email: t('authMessages.userNotFound'), psw: '', phone: '' },
  'auth/wrong-password': { email: '', psw: t('authMessages.wrongPassword'), phone: '' },
  'auth/email-already-exists': { email: t('authMessages.existingEmail'), psw: '', phone: '' },
  'auth/invalid-phone-number': { email: '', psw: '', phone: t('authMessages.phoneRules') },
  'auth/too-many-requests': {
    email: t('authMessages.tooManyRequests'),
    psw: '',
    phone: t('authMessages.tooManyRequests'),
  },
  'auth/code-expired': { code: t('authMessages.codeExpired') },
  'auth/invalid-verification-code': { code: t('authMessages.invalidCode') },
  'auth/credential-already-in-use': { code: t('authMessages.existingPhone') },
  'password-rules': { email: '', psw: t('authMessages.passwordRules'), phone: '' },
  'repeat-password': { repPsw: t('authMessages.repeatPassword') },
};
