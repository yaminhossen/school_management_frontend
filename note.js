function splitAndSum(data, delimiter) {
    // Split the string by the given delimiter
    const numbers = data.split(delimiter);

    // Convert to integers and calculate the sum
    const sum = numbers.reduce(
        (total, num) => total + parseInt(num.trim(), 16),
        0,
    );

    return sum;
}

// Example usage:
const data = '234,342,754,34,867,982,672,23';
const delimiter = ',';
console.log(splitAndSum(data, delimiter));
