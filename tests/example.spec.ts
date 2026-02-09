import { test, expect } from '@playwright/test';

test.describe('Intentional Failure', () => {
  test('this test should fail to verify artifact capture', async ({ page }) => {
    await page.goto('/');
    // This will fail: the actual title is "Demo App"
    await expect(page).toHaveTitle('This Title Does Not Exist');
  });
});

test.describe('Navigation', () => {
  test('has correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('Demo App');
  });

  test('nav links are visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Counter' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Todo' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('logo is displayed', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav .logo')).toHaveText('Demo App');
  });
});

test.describe('Modal', () => {
  test('opens and closes modal', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Learn More' }).click();
    await expect(page.locator('.modal')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'About Demo App' })).toBeVisible();

    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.locator('.modal')).not.toBeVisible();
  });

  test('closes modal by clicking overlay', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Learn More' }).click();
    await expect(page.locator('.modal')).toBeVisible();

    await page.locator('#modal-overlay').click({ position: { x: 10, y: 10 } });
    await expect(page.locator('.modal')).not.toBeVisible();
  });
});

test.describe('Counter', () => {
  test('starts at zero', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#counter-display')).toHaveText('0');
  });

  test('increments', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await expect(page.locator('#counter-display')).toHaveText('3');
  });

  test('decrements into negative', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '-' }).click();
    await expect(page.locator('#counter-display')).toHaveText('-2');
  });

  test('resets to zero', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: 'Reset' }).click();
    await expect(page.locator('#counter-display')).toHaveText('0');
  });
});

test.describe('Todo List', () => {
  test('adds a todo by clicking add button', async ({ page }) => {
    await page.goto('/');
    await page.locator('#todo-input').fill('Buy groceries');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.locator('#todo-list li')).toHaveCount(1);
    await expect(page.locator('#todo-list li span')).toHaveText('Buy groceries');
  });

  test('adds a todo by pressing Enter', async ({ page }) => {
    await page.goto('/');
    await page.locator('#todo-input').fill('Walk the dog');
    await page.locator('#todo-input').press('Enter');
    await expect(page.locator('#todo-list li')).toHaveCount(1);
  });

  test('does not add empty todo', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.locator('#todo-list li')).toHaveCount(0);
  });

  test('shows correct remaining count', async ({ page }) => {
    await page.goto('/');
    await page.locator('#todo-input').fill('Task 1');
    await page.locator('#todo-input').press('Enter');
    await page.locator('#todo-input').fill('Task 2');
    await page.locator('#todo-input').press('Enter');
    await expect(page.locator('#todo-count')).toHaveText('2 items remaining');
  });

  test('marks todo as done', async ({ page }) => {
    await page.goto('/');
    await page.locator('#todo-input').fill('Task 1');
    await page.locator('#todo-input').press('Enter');
    await page.locator('#todo-input').fill('Task 2');
    await page.locator('#todo-input').press('Enter');

    await page.locator('#todo-list li span').first().click();
    await expect(page.locator('#todo-list li').first()).toHaveClass('done');
    await expect(page.locator('#todo-count')).toHaveText('1 item remaining');
  });

  test('deletes a todo', async ({ page }) => {
    await page.goto('/');
    await page.locator('#todo-input').fill('Task to delete');
    await page.locator('#todo-input').press('Enter');
    await expect(page.locator('#todo-list li')).toHaveCount(1);

    await page.getByRole('button', { name: 'Delete' }).click();
    await expect(page.locator('#todo-list li')).toHaveCount(0);
  });
});

test.describe('Contact Form', () => {
  test('submits form successfully', async ({ page }) => {
    await page.goto('/');
    await page.locator('#name').fill('Taro Yamada');
    await page.locator('#email').fill('taro@example.com');
    await page.locator('#category').selectOption('feedback');
    await page.locator('#message').fill('Great app!');
    await page.getByRole('button', { name: 'Send' }).click();

    await expect(page.locator('#form-message')).toHaveText('Thank you, Taro Yamada! Your message has been sent.');
    await expect(page.locator('#form-message')).toHaveClass('success');
  });

  test('clears form after successful submission', async ({ page }) => {
    await page.goto('/');
    await page.locator('#name').fill('Taro');
    await page.locator('#email').fill('taro@example.com');
    await page.locator('#message').fill('Hello');
    await page.getByRole('button', { name: 'Send' }).click();

    await expect(page.locator('#name')).toHaveValue('');
    await expect(page.locator('#email')).toHaveValue('');
    await expect(page.locator('#message')).toHaveValue('');
  });

  test('category select has correct options', async ({ page }) => {
    await page.goto('/');
    const options = page.locator('#category option');
    await expect(options).toHaveCount(4);
    await expect(options.nth(1)).toHaveText('General');
    await expect(options.nth(2)).toHaveText('Support');
    await expect(options.nth(3)).toHaveText('Feedback');
  });
});
