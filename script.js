const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  });
});

document.querySelector('#year').textContent = new Date().getFullYear();

// Keep the date picker from allowing a past date.
const visitDate = document.querySelector('#visitDate');
const localToday = new Date();
const offset = localToday.getTimezoneOffset();
const today = new Date(localToday.getTime() - offset * 60 * 1000).toISOString().slice(0, 10);
visitDate.min = today;

document.querySelector('#contactForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#parentName').value.trim();
  const date = visitDate.value;
  const group = document.querySelector('#partySize').value;
  const message = `Hi Kids Playhouse! I'd like to ask about a visit. Parent/guardian: ${name}. Preferred date: ${date}. Group size: ${group}. Please confirm availability and rates.`;
  const note = document.querySelector('#formNote');
  note.textContent = 'Your inquiry is ready. Copy the message below and send it through your preferred messaging app:';
  let preview = document.querySelector('#messagePreview');
  if (!preview) {
    preview = document.createElement('textarea');
    preview.id = 'messagePreview';
    preview.readOnly = true;
    preview.setAttribute('aria-label', 'Prepared inquiry message');
    preview.style.cssText = 'width:100%;min-height:100px;margin-top:12px;padding:12px;border:1px solid #e6e2ee;border-radius:11px;color:#25234a;background:#fff8ec;resize:vertical;';
    document.querySelector('#contactForm').appendChild(preview);
    const copyButton = document.createElement('button');
    copyButton.type = 'button';
    copyButton.className = 'button button-outline';
    copyButton.textContent = 'Copy inquiry';
    copyButton.style.cssText = 'width:100%;margin-top:8px;';
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(preview.value);
        copyButton.textContent = 'Copied!';
      } catch {
        preview.select();
        document.execCommand('copy');
        copyButton.textContent = 'Select and copy if needed';
      }
    });
    document.querySelector('#contactForm').appendChild(copyButton);
  }
  preview.value = message;
});
