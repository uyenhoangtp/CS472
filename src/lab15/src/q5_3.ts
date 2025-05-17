interface Movie {
    id: string;
    title: string;
  }
  
  class Exercise3 {
    #movies: Map<string, Movie[]> = new Map();
  
    add_genre(genre: string): boolean {
      if (!this.#movies.has(genre)) {
        this.#movies.set(genre, []);
        return true;
      }
      return false;
    }
  
    add_movie_in_genre(genre: string, new_movie: Movie): boolean {
      if (!this.#movies.has(genre)) return false;
  
      const movies = this.#movies.get(genre)!;
      const exists = movies.some(movie => movie.id === new_movie.id);
      if (!exists) {
        movies.push(new_movie);
        return true;
      }
      return false;
    }
  
    update_movie_title_by_genre_and_movie_id(genre: string, movie_id: string, new_title: string): boolean {
      if (!this.#movies.has(genre)) return false;
  
      const movies = this.#movies.get(genre)!;
      const movie = movies.find(m => m.id === movie_id);
      if (movie) {
        movie.title = new_title;
        return true;
      }
      return false;
    }
  
    delete_movie_by_genre_and_movie_id(genre: string, movie_id: string): boolean {
      if (!this.#movies.has(genre)) return false;
  
      const movies = this.#movies.get(genre)!;
      const index = movies.findIndex(m => m.id === movie_id);
      if (index !== -1) {
        movies.splice(index, 1);
        return true;
      }
      return false;
    }
  
    get_movie_title_by_id(genre: string, movie_id: string): string {
      if (!this.#movies.has(genre)) return '';
  
      const movies = this.#movies.get(genre)!;
      const movie = movies.find(m => m.id === movie_id);
      return movie ? movie.title : '';
    }
  
    debug_print(): void {
      console.log(this.#movies);
    }
  }
  
  const lib = new Exercise3();
  
  console.log(lib.add_genre("thriller"));
  console.log(lib.add_genre("thriller"));
  
  console.log(lib.add_movie_in_genre("thriller", { id: "1", title: "The American" }));
  console.log(lib.add_movie_in_genre("thriller", { id: "2", title: "Arcadian" }));
  console.log(lib.add_movie_in_genre("thriller", { id: "1", title: "Duplicate" }));
  
  console.log(lib.get_movie_title_by_id("thriller", "1"));
  
  console.log(lib.update_movie_title_by_genre_and_movie_id("thriller", "1", "The New American"));
  console.log(lib.get_movie_title_by_id("thriller", "1"));
  
  console.log(lib.delete_movie_by_genre_and_movie_id("thriller", "2"));
  console.log(lib.get_movie_title_by_id("thriller", "2"));
  
  lib.debug_print();
  