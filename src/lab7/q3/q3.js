class Exercise3 {
    #movies = new Map();
  
    // Add a new genre if it does not exist
    add_genre(genre) {
      if (!this.#movies.has(genre)) {
        this.#movies.set(genre, []);
        return true;
      }
      return false;
    }
  
    // Add a new movie in the given genre if the movie id does not exist
    add_movie_in_genre(genre, new_movie) {
      if (!this.#movies.has(genre)) return false;
  
      const movies = this.#movies.get(genre);
      const exists = movies.some(movie => movie.id === new_movie.id);
      if (!exists) {
        movies.push(new_movie);
        return true;
      }
      return false;
    }
  
    // Update a movie's title based on genre and id
    update_movie_title_by_genre_and_movie_id(genre, movie_id, new_title) {
      if (!this.#movies.has(genre)) return false;
  
      const movies = this.#movies.get(genre);
      const movie = movies.find(m => m.id === movie_id);
      if (movie) {
        movie.title = new_title;
        return true;
      }
      return false;
    }
  
    // Delete a movie by genre and id
    delete_movie_by_genre_and_movie_id(genre, movie_id) {
      if (!this.#movies.has(genre)) return false;
  
      const movies = this.#movies.get(genre);
      const index = movies.findIndex(m => m.id === movie_id);
      if (index !== -1) {
        movies.splice(index, 1);
        return true;
      }
      return false;
    }
  
    // Get a movie title by genre and id
    get_movie_title_by_id(genre, movie_id) {
      if (!this.#movies.has(genre)) return '';
  
      const movies = this.#movies.get(genre);
      const movie = movies.find(m => m.id === movie_id);
      return movie ? movie.title : '';
    }
  
    // Optional: view all movies (for debugging)
    debug_print() {
      console.log(this.#movies);
    }
  }
  
  const lib = new Exercise3();

console.log(lib.add_genre("thriller"));      // true
console.log(lib.add_genre("thriller"));      // false (already exists)

console.log(lib.add_movie_in_genre("thriller", { id: "1", title: "The American" })); // true
console.log(lib.add_movie_in_genre("thriller", { id: "2", title: "Arcadian" }));     // true
console.log(lib.add_movie_in_genre("thriller", { id: "1", title: "Duplicate" }));    // false

console.log(lib.get_movie_title_by_id("thriller", "1")); // The American

console.log(lib.update_movie_title_by_genre_and_movie_id("thriller", "1", "The New American")); // true
console.log(lib.get_movie_title_by_id("thriller", "1")); // The New American

console.log(lib.delete_movie_by_genre_and_movie_id("thriller", "2")); // true
console.log(lib.get_movie_title_by_id("thriller", "2")); // ''

// Optional: view internal structure
lib.debug_print();
