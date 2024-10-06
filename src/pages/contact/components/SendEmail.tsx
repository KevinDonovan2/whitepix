import * as emailjs from '@emailjs/browser';

const accountId = import.meta.env.VITE_EMAILJS_ACCOUNT_ID || '';
const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';

/* eslint-disable */
export default function SendEmail(params: any): Promise<any> {
    if (!accountId || !serviceId || !templateId) {
        throw new Error('EmailJS configuration is missing');
    }

    emailjs.init(accountId);
    return emailjs.send(serviceId, templateId, params);
}
