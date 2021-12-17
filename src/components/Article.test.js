import React from 'react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';
import { render, screen, waitFor } from '@testing-library/react';

const testArticle = [
  {
    id: 'asdf',
    headline: 'title',
    author: '',
    createdOn: '123',
    summary: 'This is a summary',
    body: ''

  }
]

test('renders component without errors', ()=> {
  render(<Article article={testArticle}/>)
});

test('renders headline, author from the article when passed in through props', ()=> {
  render(<Article article={testArticle}/>);

  const headline = screen.getByTestId(/headline/i);
  const  author = screen.getByTestId(/author/i);

  expect(headline).toBeInTheDocument();
  expect(author).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', ()=> {
  render(<Article article={testArticle}/>);

  const author = screen.getByTestId(/author/i);

  expect(author.textContent).toContain('Associated Press');
});

test('executes handleDelete when the delete button is pressed', async ()=> {
  const mock = jest.fn()

  render(<Article article={testArticle} handleDelete={mock}/>);

  const deleteBtn = screen.getByTestId(/deleteButton/i);
  userEvent.click(deleteBtn);

  await waitFor(() => expect(mock).toBeCalled())

});

//Task List:
//1. Complete all above tests. Create test article data when needed.