# DJS03: Book Connect - Abstractions

Dive into the delightful world of "Book Connect," where literary adventures await at your fingertips! Browse, explore, and uncover your next great read from a vast, vibrant collection. Whether you're a fan of thrilling mysteries, epic fantasies, or heartwarming romances, "Book Connect" brings the magic of books directly to you. Happy reading! 

The "Book Connect" project provides an opportunity to refine a fully functional version of an application. The focus of this project is to enhance the code's maintainability, extendibility, and readability by applying concepts of objects and functions for abstraction. This will not only streamline future modifications but also consolidate students' understanding of higher-level programming concepts, including documentation, Styleguides, and abstraction principles.

![image](https://github.com/Dimpho-Molepo/DIMMOL405_BCL2401_GroupA_Dimpho-Molepo_DJS03/assets/136012291/29e5abca-3a36-4150-8129-a8d7e16a198a)


## Project Overview

#### Goals

- **Refactor Existing Code**: Analyse and refactor the given JavaScript and HTML code to improve its structure using objects and functions.
- **Implement Abstraction**: Use abstraction to hide the complex reality while exposing only the necessary parts. This involves creating more generic functions that can perform tasks in a more flexible way.
- **Documentation**: Write clear comments and documentation for the new code structure to explain the purpose and functionality of code blocks, functions, and objects.
- **Follow Styleguides**: Adhere to established coding conventions and Styleguides to ensure code readability and maintainability.

#### Tasks

1. **Code Analysis**: Start by understanding the current implementation of the "Book Connect" application, including its HTML structure and JavaScript functionality.
2. **Plan Refactoring**: Identify sections of the code that can be made more abstract and modular. Look for patterns and repetitive code that can be simplified.
3. **Implement Abstraction**:
   - **Objects**: Define objects to represent key elements of the application, such as books, authors, and genres. Utilise the provided data (e.g., `authors`, `genres`, `books`) to populate these objects.
   - **Functions**: Create functions that handle repetitive tasks, such as rendering the book list, handling user interactions, and applying filters.
4. **Enhance Functionality**: Ensure that the application remains fully functional after refactoring. Test all features to confirm that users can still search, filter, and view books as intended.
5. **Documentation and Comments**: Throughout the refactoring process, document your code. Provide comments that explain the purpose and functionality of objects and functions.
6. **Adherence to Styleguides**: Ensure the code follows JavaScript and HTML coding standards and best practices for readability and maintainability.

## Discussion and Reflection

### Project Analysis

The essence of this project was for us to get a further understanding of abstraction and submerge and orientated our thinking partern into Object Orientated Programming(OOP). 
- I started by identifying the repetative code which was retrieving elements from the DOM and from there I created an elements.js file that contains an object that has all the DOM elements used in script.js
- I created settingsFormSubmit.js file for when the settings form is submitted. It contains functions that update CSS vriables by toggling between day and night according to the users submission
- I abstracted the button the shows the remaining books by creating a function that calculates the remaining books and placing this function in showMoreBooks.js file
- I created a  rendersBookLists.js to render books on the page by creating the book previews and show the book details when it is clicked
- I created the searchForm.js which is reponsible to create the obtions element and also filter the books according to the title, author and genre of the user has submitted.

### Challenges and Reflections

My biggest challenge in this project was dicerning what to abstract and what not to abstract. I don't know if it's possible to over abstract but I feel like that was one biggest huddles that I faced because at some point my functions were even confusing me and not functioning correctly, but I over come this huddle by redoing this project like almost 4 times to trace my steps and see where I introduced bugs to the functionality of the code. It was an overroll challenging project that I really enjoyed because it exposed my weak points and showed me where to improve where it comes to implementation and attitude towards fustration. Over coming these challenges was not easy but through the assistance of my classmates and external resources I was able to actually achieve the goals and complete all the required tasks of this project.

## Author
Dimpho Molepo
