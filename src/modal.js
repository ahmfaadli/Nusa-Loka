export function setupModal() {
  const modals = document.querySelectorAll('[id*="modal"]')

  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden')
      }
    })
  })
}
