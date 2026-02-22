const minInput = document.getElementById("min-range");
const maxInput = document.getElementById("max-range");
const minValue = document.getElementById("min-value");
const maxValue = document.getElementById("max-value");
const diffLabel = document.getElementById("diff-label");
const percentLabel = document.getElementById("percent-label");
const rangeFill = document.getElementById("range-fill");

const rangeMin = 0;
const rangeMax = 1000;
const step = 25;
const minGap = 25;

minInput.min = rangeMin;
minInput.max = rangeMax;
minInput.step = step;
maxInput.min = rangeMin;
maxInput.max = rangeMax;
maxInput.step = step;

minInput.value = 300;
maxInput.value = 700;

const updateUI = () => {
	const minVal = Number(minInput.value);
	const maxVal = Number(maxInput.value);
	const total = rangeMax - rangeMin;
	const leftPercent = ((minVal - rangeMin) / total) * 100;
	const rightPercent = 100 - ((maxVal - rangeMin) / total) * 100;

	rangeFill.style.left = `${leftPercent}%`;
	rangeFill.style.right = `${rightPercent}%`;

	minValue.textContent = `$${minVal}`;
	maxValue.textContent = `$${maxVal}`;
	diffLabel.textContent = `Difference: $${maxVal - minVal}`;
	const percent = Math.round(((maxVal - minVal) / total) * 100);
	percentLabel.textContent = `${percent}% of range`;
};

const clampInputs = (event) => {
	let minVal = Number(minInput.value);
	let maxVal = Number(maxInput.value);

	if (maxVal - minVal < minGap) {
		if (event.target === minInput) {
			minVal = maxVal - minGap;
			minInput.value = minVal;
		} else {
			maxVal = minVal + minGap;
			maxInput.value = maxVal;
		}
	}

	minVal = Math.max(rangeMin, Math.min(minVal, rangeMax - minGap));
	maxVal = Math.min(rangeMax, Math.max(maxVal, rangeMin + minGap));
	minInput.value = minVal;
	maxInput.value = maxVal;

	updateUI();
};

minInput.addEventListener("input", clampInputs);
maxInput.addEventListener("input", clampInputs);

updateUI();
