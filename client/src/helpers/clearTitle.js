const clearTitle = title => {
  const noParentheses = title.replace(/ *\([^)]*\) */g, '');
  return noParentheses;
};
export default clearTitle;
