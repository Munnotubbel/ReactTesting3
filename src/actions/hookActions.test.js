import moxios from "moxios";

import {getSecretWord} from "./hookActions";

describe("moxios test",()=>{

beforeEach(()=>{
    //makes moxios recieve all axios requests instead of http
    moxios.install();
});


afterEach(()=>{
    // returning axios to it's http state
    moxios.uninstall();
});

// test needs to be async because it needs to wait for moxios answer
test("calls the getSecretWord callback on axios responst",async()=>{
    const secretWord="party";

    //handles all axios call during the request
    moxios.wait(()=>{
        const request = moxios.requests.mostRecent();

        // equivalent to the responst to the secret-word server
        request.respondWith({
            status: 200,
            response: secretWord,
        });
    });

    // create mock for callback arg
    const mockSetSecretWord = jest.fn();

    await getSecretWord(mockSetSecretWord);

    // see whether mock was run with the correct argument
    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);

});




});