// Function to encode an IPv4 address to an integer
export function encodeIp(ip: string) {
	const ipParts = ip.split('.');
	if (ipParts.length !== 4) {
		throw new Error('Non-IPv4 detected. Please provide a valid IPv4 address.');
	}

	// Convert each part of the IP to an integer and use bitwise shift to encode
	return (
		(parseInt(ipParts[0]) << 24) |
		(parseInt(ipParts[1]) << 16) |
		(parseInt(ipParts[2]) << 8) |
		parseInt(ipParts[3])
	);
}

// Function to decode an integer back to an IPv4 address
export function decodeIp(ip: number) {
	// Extract each byte using bitwise operations and construct the IP string
	const part1 = (ip >>> 24) & 0xff;
	const part2 = (ip >>> 16) & 0xff;
	const part3 = (ip >>> 8) & 0xff;
	const part4 = ip & 0xff;

	return `${part1}.${part2}.${part3}.${part4}`;
}
