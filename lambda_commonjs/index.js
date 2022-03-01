const { parseUrl } = require('@aws-sdk/url-parser');

exports.handler = async function() {
    console.log(parseUrl('https://aws.amazon.com/'));
    return 'ok';
}
