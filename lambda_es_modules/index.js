import { parseUrl } from '@aws-sdk/url-parser';

export const handler = async () => {
    console.log(parseUrl('https://aws.amazon.com/'));
    return 'ok';
}
