import React from "react";
import { createBook } from "../actions/index";

const categories = [
  "Action",
  "Biography",
  "History",
  "Horror",
  "Kids",
  "Learning",
  "Sci-Fi",
];

class BooksForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: Math.floor(Math.random() * 100),
      title: "",
      category: categories[0],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    if (e.target.name === "title") {
      this.setState({
        title: e.target.value,
      });
    } else if (e.target.name === "category") {
      this.setState({
        category: e.target.value,
      });
    }
  }

  handleSubmit(e) {
    const { title } = this.state;
    e.preventDefault();
    if (title) {
      createBook(this.state);
      this.reset();
    }
  }
  reset() {
    this.setState({
      id: Math.ceil(Math.random() * 100),
      title: "",
      category: categories[0],
    });
  }

  render() {
    const { title, category } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Title</h2>
        <input
          name="title"
          type="text"
          value={title}
          onChange={this.handleChange}
        />
        <h2>Category</h2>
        <select name="category" value={category} onChange={this.handleChange}>
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default BooksForm;