
export interface Sound {
    play: () => void;
}

function load(name: string): Sound {
  //     const audio = new Audio((window as any).applicationBaseUrl + `/sounds/${name}`);
    const audio = new Audio(`/spot-problems-single/sounds/${name}`);
    return {
        play: () => audio.play().then(() => {}),
    };
}

export const sounds = {
    correct: load("correct.wav"),
    wrong: load("wrong.wav"),
};
