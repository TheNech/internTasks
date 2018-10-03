/* 
    Пример входных данных:
    [
        {
            point: 'Gerona Airport',
            destination: 'Stockholm',
            transport: {
                type: 'aircraft',
                number: 'SK455',
                gate: '45B',
                seat: '3A',
                baggageDrop: '344'
            }
        }
    ]

    * Виды транспорта: 'train', 'airportBus', 'aircraft' 
    
    Пример выходных данных:
    [
        'From Gerona Airport, take flight SK455 to Stockholm. Gate 45B. Seat 3A. Baggage drop at ticket counter 344.'
    ]

*/

export function makeRoute(data) {
    if(!(data instanceof Array)) {
        throw 'Error! Input data should be array.';
    }

    let placesObj = getPlacesObj(data);
    let cardIndex = getFirstCardIndex(data, placesObj.destinations);

    let orderedCards = data.slice(cardIndex, ++cardIndex);
    let instructions = [];

    for(let i = 0; i < data.length; i++) {
        instructions.push(getTripInstruction(orderedCards[i]));

        let nextCardIndex = placesObj.points.indexOf(orderedCards[i].destination);
        orderedCards.push(data[nextCardIndex]);
    }

    return instructions;
}

function getPlacesObj(data) {
    let places = {
        points: [],
        destinations: []
    };
    data.forEach(el => {
        if(!el.point || el.point === '') {
            throw 'Error! Card has not point:\n' + JSON.stringify(el, '', 4);
        } else {
            places.points.push(el.point);
        }

        if(!el.destination || el.destination === '') {
            throw 'Error! Card has not destination:\n' + JSON.stringify(el, '', 4);
        } else {
            places.destinations.push(el.destination);
        }
    });

    return places;
}

function getFirstCardIndex(cards, destinations) {
    for (const item of cards) {
        if (destinations.indexOf(item.point) === -1) {
            return cards.indexOf(item);
        }
    }
}

function getTripInstruction(card) {
    let instruction = '';

    switch(card.transport.type) {
        case 'train':
            instruction = `Take train ${card.transport.number} from ${card.point} to ${card.destination}. ${printSeat(card.transport)}`;
            break;
        case 'airportBus':
            instruction = `Take the airport bus from ${card.point} to ${card.destination}. ${printSeat(card.transport)}`;
            break;
        case 'aircraft' :
            instruction = `From ${card.point}, take flight ${card.transport.number} to ${card.destination}. Gate ${card.transport.gate}. ${printSeat(card.transport)} ${printBaggageDrop(card.transport)}`;
                break;
        default: instruction = `From ${card.point} to ${card.destination} by ${card.transport.type}`;
    }

    return instruction;
}

function printSeat(transport) {
    if(transport.seat) {
        return `Seat ${transport.seat}.`;
    } else {
        return 'No seat assignment.';
    }
}

function printBaggageDrop(transport) {
    if(transport.baggageDrop) {
        return `Baggage drop at ticket counter ${transport.baggageDrop}.`;
    } else {
        return `Baggage will be automatically transferred from your last leg.`;
    }
}
