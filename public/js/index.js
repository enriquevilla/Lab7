const APIKEY = "2abbf7c3-245b-404f-9473-ade729ed4653";

const getBookmarksOnLoad = () => {
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${APIKEY}`
        }
    }
    fetch("/bookmarks", settings)
        .then(r => {
            if (r.ok) {
                return r.json();
            } else {
                throw new Error(r.statusText);
            }
        })
        .then(j => {
            document.querySelector(".results").innerHTML = "";
            for (let i of j) {
                document.querySelector(".results").innerHTML += `
                    <div class="item">
                        <p>
                            ID: ${i.id}
                        </p>
                        <p>
                            Title: ${i.title}
                        </p>
                        <p>
                            Description: ${i.description}
                        </p>
                        <p>
                            URL: ${i.url}
                        </p>
                        <p>
                            Rating: ${i.rating}
                        </p>
                    </div>
                `;
            }
        })
        .catch(err => {
            document.querySelector(".results").innerText = err.message;
        });
}

const getBookmarksByTitle = (title) => {
    const settings = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${APIKEY}`
        }
    }
    fetch(`/bookmark?title=${title}`, settings)
        .then(r => {
            if (r.ok) {
                return r.json();
            } else {
                throw new Error(r.statusText);
            }
        })
        .then(j => {
            document.querySelector(".results").innerHTML = "";
            for (let i of j) {
                document.querySelector(".results").innerHTML += `
                    <div class="item">
                        <p>
                            ID: ${i.id}
                        </p>
                        <p>
                            Title: ${i.title}
                        </p>
                        <p>
                            Description: ${i.description}
                        </p>
                        <p>
                            URL: ${i.url}
                        </p>
                        <p>
                            Rating: ${i.rating}
                        </p>
                    </div>
                `;
            }
        })
        .catch(err => {
            document.querySelector(".results").innerText = err.message;
        });
}

const addBookmark = (title, description, url, rating) => {
    const b = {
        title: title,
        description: description,
        url: url,
        rating: rating
    }
    const settings = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${APIKEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(b)
    }
    fetch(`/bookmarks`, settings)
        .then(r => {
            if (r.ok) {
                return r.json();
            } else {
                throw new Error(r.statusText);
            }
        })
        .then(j => {
            document.querySelector(".results").innerHTML = "";
            document.querySelector(".results").innerHTML = `
                <div class="item">
                    <p>
                        ID: ${j.id}
                    </p>
                    <p>
                        Title: ${j.title}
                    </p>
                    <p>
                        Description: ${j.description}
                    </p>
                    <p>
                        URL: ${j.url}
                    </p>
                    <p>
                        Rating: ${j.rating}
                    </p>
                </div>
            `;
        })
        .catch(err => {
            document.querySelector(".results").innerText = err.message;
        });
}

const deleteBookmark = (id) => {
    const settings = {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${APIKEY}`
        },
    }
    fetch(`/bookmark/${id}`, settings)
        .then(r => {
            if (r.ok) {
                return r.json();
            } else {
                throw new Error(r.statusText);
            }
        })
        .then(_ => {
            document.querySelector(".results").innerHTML = "";
            document.querySelector(".results").innerHTML = `
                <div>
                    Item successfully removed
                </div>
            `;
        })
        .catch(err => {
            document.querySelector(".results").innerText = err.message;
        });
}

const updateBookmark = (id, title, description, url, rating) => {
    const b = {
        id: id,
        title: title,
        description: description,
        url: url,
        rating: rating
    }
    const settings = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${APIKEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(b)
    }
    fetch(`/bookmark/${id}`, settings)
        .then(r => {
            if (r.ok) {
                return r.json();
            } else {
                throw new Error(r.statusText);
            }
        })
        .then(j => {
            document.querySelector(".results").innerHTML = "";
            document.querySelector(".results").innerHTML = `
                <div class="item">
                    <p>
                        ID: ${j.id}
                    </p>
                    <p>
                        Title: ${j.title}
                    </p>
                    <p>
                        Description: ${j.description}
                    </p>
                    <p>
                        URL: ${j.url}
                    </p>
                    <p>
                        Rating: ${j.rating}
                    </p>
                </div>
            `;
        })
        .catch(err => {
            document.querySelector(".results").innerText = err.message;
        });
}

const watchGetAll = () => {
    document.querySelector(".get-bookmarks-form").addEventListener("submit", (e) => {
        e.preventDefault();
        getBookmarksOnLoad();
    });
}

const watchGetByTitle = () => {
    document.querySelector(".get-bookmarksbytitle-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.querySelector(".get-bookmarksbytitle-form > #bookmarkTitle").value;
        getBookmarksByTitle(title);
    });
}

const watchPost = () => {
    document.querySelector(".add-bookmark-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.querySelector(".add-bookmark-form > #bookmarkTitle").value;
        const description = document.querySelector(".add-bookmark-form > #bookmarkDescription").value;
        const url = document.querySelector(".add-bookmark-form > #bookmarkURL").value;
        const rating = document.querySelector(".add-bookmark-form > #bookmarkRating").value;
        addBookmark(title, description, url, rating);
    });
}

const watchDelete = () => {
    document.querySelector(".delete-bookmark-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.querySelector(".delete-bookmark-form > #bookmarkID").value;
        deleteBookmark(id);
    })
}

const watchUpdate = () => {
    document.querySelector(".update-bookmark-form").addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.querySelector(".update-bookmark-form > #bookmarkID").value;
        const title = document.querySelector(".update-bookmark-form > #bookmarkTitle").value;
        const description = document.querySelector(".update-bookmark-form > #bookmarkDescription").value;
        const url = document.querySelector(".update-bookmark-form > #bookmarkURL").value;
        const rating = document.querySelector(".update-bookmark-form > #bookmarkRating").value;
        updateBookmark(id, title, description, url, rating);
    });
}

const init = () => {
    getBookmarksOnLoad();
    watchGetAll();
    watchGetByTitle();
    watchPost();
    watchDelete();
    watchUpdate();
}

init();