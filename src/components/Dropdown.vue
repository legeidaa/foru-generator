<template>
	<div class="dropdown-select">
		<button
			class="dropdown-select__text"
			@click="toggleDropdown"
			@blur="dropdownOpened = false"
			:class="{open: dropdownOpened}"
		>
			<slot />
		</button>
		<transition name="slide">
			<div
				class="dropdown-select__menu"
				v-show="dropdownOpened"
			>
				<ul>
					<li
						:class="{active: type == this.selectedBlockType}"
						class="dropdown-select__item"
						v-for="type in blockTypes"
						:key="type"
						@click="$emit('selectType', type)"
					>
						{{ type }}
					</li>
				</ul>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: "DropdownSelect",
	props: {
		blockTypes: Array,
		selectedBlockType: String
	},

	data() {
		return {
			dropdownOpened: false,
		};
	},
	
	methods: {
		toggleDropdown() {
			this.dropdownOpened = !this.dropdownOpened;
		},
	},
};
</script>
