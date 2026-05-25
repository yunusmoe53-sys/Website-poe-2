const loader = document.querySelector('.page-loader');
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const contactForm = document.querySelector('.contact-form');

window.addEventListener('load', () => {
  loader.classList.add('hidden');
  setTimeout(() => loader.setAttribute('aria-hidden', 'true'), 500);
});

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  siteNav.classList.toggle('open');
});

contactForm.addEventListener('submit', event => {
  event.preventDefault();
  const submitButton = contactForm.querySelector('button[type="submit"]');
  submitButton.textContent = 'Sending...';
  submitButton.disabled = true;

  setTimeout(() => {
    submitButton.textContent = 'Send message';
    submitButton.disabled = false;
    contactForm.reset();
    contactForm.querySelector('#name').focus();
    alert('Thanks! Your message was sent successfully.');
  }, 950);
});

const heroButtons = document.querySelectorAll('.button');
heroButtons.forEach(button => {
  button.addEventListener('mouseover', () => button.style.transform = 'translateY(-1px)');
  button.addEventListener('mouseout', () => button.style.transform = 'translateY(0)');
});

const quickIssueInput = document.querySelector('#quick-issue');
const quickRespondButton = document.querySelector('#quick-respond');
const quickResponsePanel = document.querySelector('#quick-response');

const quickSupportResponses = [
  {
    keywords: /exam|test|final|midterm|quiz|assessment/i,
    message: 'When exam pressure feels heavy, start with one focused study block, then pause for a quick reset. Small, steady steps make it easier to move forward.'
  },
  {
    keywords: /assignment|project|essay|paper|submission/i,
    message: 'Break the task into one clear first step and build momentum from there. Focus on progress, not perfection, and reward yourself after each milestone.'
  },
  {
    keywords: /sleep|tired|lost sleep|exhausted/i,
    message: 'Lack of sleep makes everything harder. Try a short recovery break, drink water, and then return with a simple task to rebuild your rhythm.'
  }
];

if (quickRespondButton && quickIssueInput && quickResponsePanel) {
  quickRespondButton.addEventListener('click', () => {
    const issueText = quickIssueInput.value.trim();
    if (!issueText) {
      quickResponsePanel.textContent = 'Please type your concern first so we can give you fast guidance.';
      quickIssueInput.focus();
      return;
    }

    quickRespondButton.textContent = 'Support arriving…';
    quickRespondButton.disabled = true;
    quickResponsePanel.textContent = 'Preparing a fast support response…';

    const match = quickSupportResponses.find(item => item.keywords.test(issueText));
    const suggestion = match
      ? match.message
      : 'Start with one simple step and give yourself credit for asking for support. That first move helps turn pressure into focus.';

    setTimeout(() => {
      quickResponsePanel.innerHTML = `
        <p><strong>Fast response:</strong> ${suggestion}</p>
        <p>Come back anytime for another quick support prompt.</p>
      `;
      quickRespondButton.textContent = 'Quick support';
      quickRespondButton.disabled = false;
    }, 600);
  });
}
