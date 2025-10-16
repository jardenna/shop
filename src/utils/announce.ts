const announce = (msg: string) => {
  const el = document.createElement('div');
  el.setAttribute('aria-live', 'polite');
  el.setAttribute('aria-atomic', 'true');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  el.textContent = msg;
  document.body.appendChild(el);

  // remove again after short delay
  setTimeout(() => {
    el.remove();
  }, 1000);
};

export default announce;
