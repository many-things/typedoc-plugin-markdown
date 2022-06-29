"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Handlebars = require("handlebars");
function default_1(theme) {
    Handlebars.registerHelper('comment', function (parts) {
        const result = [];
        for (const part of parts) {
            switch (part.kind) {
                case 'text':
                case 'code':
                    result.push(part.text);
                    break;
                case 'inline-tag':
                    switch (part.tag) {
                        case '@label':
                        case '@inheritdoc':
                            break;
                        case '@link':
                        case '@linkcode':
                        case '@linkplain': {
                            if (part.target) {
                                const url = typeof part.target === 'string'
                                    ? part.target
                                    : Handlebars.helpers.relativeURL(part.target.url);
                                const wrap = part.tag === '@linkcode' ? '`' : '';
                                result.push(url ? `[${wrap}${part.text}${wrap}](${url})` : part.text);
                            }
                            else {
                                result.push(part.text);
                            }
                            break;
                        }
                        default:
                            result.push(`{${part.tag} ${part.text}}`);
                            break;
                    }
                    break;
                default:
                    result.push('');
            }
        }
        return result.join('');
    });
}
exports.default = default_1;
