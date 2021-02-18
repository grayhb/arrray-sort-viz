export function bubbleSort(items) {

    let len = items.length;
    let animations = [];

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {

            const anim = {};
            anim.comp = [j, j + 1];

            if (items[j] > items[j + 1]) {

                let tmp = items[j];
                items[j] = items[j + 1];
                items[j + 1] = tmp;

                anim.swap = [j, j + 1];
            }

            animations.push(anim);

        }
    }

    return [items, animations];
}