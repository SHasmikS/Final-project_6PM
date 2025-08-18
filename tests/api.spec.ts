import { test, expect } from '@playwright/test';



test.describe('6pm.com API smoke checks', () => {
  test('GET homepage returns 200 and HTML content-type', async ({ request }) => {
    const response = await request.get('https://www.6pm.com/');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'] || '';
    expect(contentType.toLowerCase()).toContain('text/html');
  });
  
  test('HEAD homepage returns 200', async ({ request }) => {
    const response = await request.head('https://www.6pm.com/');
    expect(response.status()).toBe(200);
  });

  

  test('Search page for query returns HTML', async ({ request }) => {
    const response = await request.get('https://www.6pm.com/search?q=crocs', { headers: { 'Accept': 'text/html' } });
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'] || '';
    expect(contentType.toLowerCase()).toContain('text/html');
    const body = await response.text();
    expect(body.toLowerCase()).toContain('<html');
  });

  
  test('favicon.ico is served as an image', async ({ request }) => {
    const response = await request.get('https://www.6pm.com/favicon.ico');
    expect(response.status()).toBe(200);
    const contentType = response.headers()['content-type'] || '';
    expect(contentType.toLowerCase()).toContain('image');
  });
    
  });

