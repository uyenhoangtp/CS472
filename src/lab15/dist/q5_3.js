"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Exercise3_movies;
class Exercise3 {
    constructor() {
        _Exercise3_movies.set(this, new Map());
    }
    add_genre(genre) {
        if (!__classPrivateFieldGet(this, _Exercise3_movies, "f").has(genre)) {
            __classPrivateFieldGet(this, _Exercise3_movies, "f").set(genre, []);
            return true;
        }
        return false;
    }
    add_movie_in_genre(genre, new_movie) {
        if (!__classPrivateFieldGet(this, _Exercise3_movies, "f").has(genre))
            return false;
        const movies = __classPrivateFieldGet(this, _Exercise3_movies, "f").get(genre);
        const exists = movies.some(movie => movie.id === new_movie.id);
        if (!exists) {
            movies.push(new_movie);
            return true;
        }
        return false;
    }
    update_movie_title_by_genre_and_movie_id(genre, movie_id, new_title) {
        if (!__classPrivateFieldGet(this, _Exercise3_movies, "f").has(genre))
            return false;
        const movies = __classPrivateFieldGet(this, _Exercise3_movies, "f").get(genre);
        const movie = movies.find(m => m.id === movie_id);
        if (movie) {
            movie.title = new_title;
            return true;
        }
        return false;
    }
    delete_movie_by_genre_and_movie_id(genre, movie_id) {
        if (!__classPrivateFieldGet(this, _Exercise3_movies, "f").has(genre))
            return false;
        const movies = __classPrivateFieldGet(this, _Exercise3_movies, "f").get(genre);
        const index = movies.findIndex(m => m.id === movie_id);
        if (index !== -1) {
            movies.splice(index, 1);
            return true;
        }
        return false;
    }
    get_movie_title_by_id(genre, movie_id) {
        if (!__classPrivateFieldGet(this, _Exercise3_movies, "f").has(genre))
            return '';
        const movies = __classPrivateFieldGet(this, _Exercise3_movies, "f").get(genre);
        const movie = movies.find(m => m.id === movie_id);
        return movie ? movie.title : '';
    }
    debug_print() {
        console.log(__classPrivateFieldGet(this, _Exercise3_movies, "f"));
    }
}
_Exercise3_movies = new WeakMap();
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
