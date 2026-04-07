import { test, expect } from '@playwright/test';

test('test basic react @sanity', async ({ page }) => {
 // await page.pause();  
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('buy grocery'); 
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('go for walk');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('play pingpong');
  await page.getByTestId('text-input').press('Enter');
//   await page.getByRole('listitem').filter({ hasText: 'buy grocery' }).getByTestId('todo-item-toggle').check();
//   await page.getByRole('listitem').filter({ hasText: 'go for walk' }).getByTestId('todo-item-toggle').check();
//   await page.getByRole('listitem').filter({ hasText: 'play pingpong' }).getByTestId('todo-item-toggle').check();
  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('take rest');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('have dinner');
  await page.getByTestId('text-input').press('Enter');
  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByText('have dinner')).toBeVisible();
  await page.getByText('take rest').click();
  await page.getByText('have dinner').click();
  //await page.getByRole('listitem').filter({ hasText: 'have dinner' }).getByTestId('todo-item-toggle').check();
  await expect(page.getByText('have dinner')).toBeVisible();
});

test('Todo Add Complete Delete @smoke', async ({ page }) => {
    
    await page.goto('https://todomvc.com/examples/react/dist/');
    //https://todomvc.com/examples/react/dist/
    //await page.goto('https://todomvc.com/examples/react/dist/');
    //await page.pause();
    const newTodo = await page.getByTestId('text-input');
    //page.locator('.new-todo'); text-input');
    await newTodo.fill('Buy milk');
    await newTodo.press('Enter');
    await newTodo.fill('Write test');
    await newTodo.press('Enter');
    await newTodo.fill('Clean desk');
    await newTodo.press('Enter');

    const items = page.locator('.todo-list li');
    await expect(items).toHaveCount(3);

    //mark second item to complete
    await items.nth(1).locator('.toggle').check();

    //select thrid item (hover + click to destroy)
    await items.nth(2).hover();
    await items.nth(2).locator('.destroy').click({force: true});
    await expect(items).toHaveCount(2);

    await page.screenshot({path: './screenshots/todo-final.png'});

});