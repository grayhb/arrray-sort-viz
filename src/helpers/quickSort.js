
export function quickSort(items, left, right, animations) {
    
    if (!animations)
        animations = [];

    var index;
    if (items.length > 1) {

        left = typeof left != "number" ? 0 : left;
        right = typeof right != "number" ? items.length - 1 : right;

        index = partition(items, left, right, animations);

        if (left < index - 1) {
            quickSort(items, left, index - 1, animations);
        }
        
        if (index < right) {
            quickSort(items, index, right, animations);
        }
    }

    return [items, animations];
}

function swap(items, firstIndex, secondIndex){
    const temp = items[firstIndex];
    items[firstIndex] = items[secondIndex];
    items[secondIndex] = temp;
}

function partition(items, left, right, animations) {

    let pivot   = items[Math.floor((right + left) / 2)],
        i       = left,
        j       = right;

    while (i <= j) {

        while (items[i] < pivot) {
            i++;
        }

        while (items[j] > pivot) {
            j--;
        }

        const anim = {};
        anim.comp = [i, j];

        if (i <= j) {
            anim.swap = [i, j];
            swap(items, i, j);
            i++;
            j--;
        }
        
        animations.push(anim);
    }
    return i;
}

