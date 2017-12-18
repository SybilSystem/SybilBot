const util = require('util');
exports.run = async (client,message, args = []) => {
  const suffix =args.join(' ');
  try {
    let evaled = await eval(suffix);
    const type = typeof evaled;
    const insp = util.inspect(evaled, {depth: 0});
    const toSend= [];

    if (evaled === null) evaled ='null';

    toSend.push('**EVAL:**');
    toSend.push('```js');
    toSend.push(clean(suffix));
    toSend.push('```');
    toSend.push('**Evaluates to:**');
    toSend.push('```LDIF');
    toSend.push(clean(evaled.toString().replace(client.token, 'Redacted').replace(client.user.email, 'Redacted')));
    toSend.push('```');
    if (evaled instanceof Object) {
      toSend.push('**Inspect:**');
      toSend.push('```js');
      toSend.push(clean(insp.toString().replace(client.token, 'Redacted').replace(client.user.email, 'Redacted')));
      toSend.push('```');
    } else {
      toSend.push('**Type:**');
      toSend.push('```js');
      toSend.push(type);
      toSend.push('```');
    }
    await message.channel.send(toSend, {split: true});
  } catch (err) {
    const toSend = [];
    toSend.push('**EVAL:**');
    toSend.push('```js');
    toSend.push(clean(suffix));
    toSend.push('```');
    toSend.push('**Error:** ```LDIF');
    toSend.push(clean(err.message));
    toSend.push('```');
    await message.channel.send(toSend, {split: true});
  }
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['ev'],
  permsLevel: 'Bot Owner'
};

exports.help = {
  name: 'eval',
  description: 'Evaluates arbitrary Javascript.',
  usage: 'eval <expression>'
};

function clean(text) {
  if (typeof(text) === 'string') {
    return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
  } else {
    return text;
  }
}
