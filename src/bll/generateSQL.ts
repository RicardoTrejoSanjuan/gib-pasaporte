let insertLaminaSQL: string[] = [];
let insertLibretaSQL: string[] = [];

export const generateSQL = async (rows: []) => {
    insertLaminaSQL = [];
    insertLibretaSQL = [];
    rows.forEach((row: any[], index) => {
        if (index === 0) {
            return;
        }

        row.forEach((item: any, i) => {
            switch (i) {
                case 0: // Lamina
                    if (item) { insertLamina(item); }
                    break;
                case 1: // Libreta
                    if (item) { insertLibreta(item); }
                    break;
                case 2:
                    if (index === 1) { return; }
                    if (item === null) { return; }
                    LoopRecords(item, row[i + 1]);
                    break;
                default:
                    break;
            }
        });
    });

    return {lamina: insertLaminaSQL, libreta: insertLibretaSQL};
};

const insertLamina = (lamina: any) => {
    insertLaminaSQL.push(lamina);
};

const insertLibreta = (libreta: any) => {
    insertLibretaSQL.push(libreta);
};

const LoopRecords = (start: any, end: any) => {
    const character = /^.*[a-zA-Z].*$/;
    const hasCharacter = character.exec(start);
    let letter: string = '';
    if (hasCharacter) {
        letter = start.charAt(0);
        start = start.slice(1);
        end = end.slice(1);
    }

    for (let i = start; i <= end; i++) {
        if (letter !== '') {
            insertLibreta(letter + i);
        } else {
            insertLamina(i);
        }
    }
};
