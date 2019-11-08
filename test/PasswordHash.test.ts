import {compare, hash} from "../src/PasswordHash";

test("should return hash", done => {
    hash("Password123")
        .then(res => {
            expect(res).toBeTruthy();
            done();
        });
});

test("should match", done => {
    compare("Password123", "$2b$12$LaiFrc5j0zTdSJkiyvOm1OJ9XPMJJ3H1vYFCYIIHUq0.XtArhJLja")
        .then(res => {
            expect(res).toBe(true);
            done();
        });
});

test("shouldn't match", done => {
    compare("Password", "$2b$12$LaiFrc5j0zTdSJkiyvOm1OJ9XPMJJ3H1vYFCYIIHUq0.XtArhJLja")
        .then(res => {
            expect(res).toBe(false);
            done();
        });
});
