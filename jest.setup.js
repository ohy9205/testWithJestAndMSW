// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import "next";
import { server } from "./__mocks__/server";
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
