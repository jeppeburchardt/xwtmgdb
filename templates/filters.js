const icons = (text, options) => {
  console.log('options', text, options);
  return text.replace(/(evade|hit|cit|focus)/gi, '<i class="$&">$&</i>');
}

module.exports = {
  icons,
};
