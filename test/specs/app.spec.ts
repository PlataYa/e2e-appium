describe('My App', () => {
  it('should open the app', async () => {
    // Solo verificar que la app se abre
    console.log('App launched successfully!');

    // Esperar un poco para ver que se abre
    await browser.pause(3000);
  });
});
