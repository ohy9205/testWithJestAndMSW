// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import "next";

beforeAll(() => server.listen());
afterAll(() => server.close());
