import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("<Blog />,", () => {
    //let container

    const testBlog = {
        author: "Test Author",
        title: "Test Title",
        url: "https://example.com",
        likes: 1,
        user: {
            username: "testUser"
        }
    }

    const addLike = jest.fn()
    const deleteBlog = jest.fn()

    beforeEach(() => {
        render(<Blog blog={testBlog} addLike={addLike} deleteBlog={deleteBlog} loggedInUsername="testUser" />)
    })

    test("renders title in minimal view", () => {
        screen.getByText("Test Author")
    })

    test("renders url in expanded view", async () => {
        await openExpandedView()
        screen.getByText("https://example.com")
    })

    test("renders user (who submitted blog) in expanded view", async () => {
        await openExpandedView()
        screen.getByText("testUser", { exact: false })
    })
})

const openExpandedView = async () => {
    const showExpandedViewButton = screen.getByRole("button", { name: "View" })
    await userEvent.click(showExpandedViewButton)
}