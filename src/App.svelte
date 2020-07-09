<script>import { bind } from "svelte/internal";

	import { db } from "./firebase";
	import toastr from "toastr";

	let task = {
		name: "",
		description: ""
	};

	let tasks = [];
	let editStatus = false;
	let currentId;

	db.collection('tasks').onSnapshot(querySnapshot => {
		let docs = [];
		querySnapshot.forEach(doc => {
			docs.push({
				...doc.data(),
				id: doc.id
			});
		});

		tasks = [...docs];
	});

	const addTask = async () => {
		await db.collection('tasks').doc().set({
			...task, createdAt: Date.now()
		});

		toastr.info('Product added successfully', '', {
			timeOut: 3000,
			progressBar: true,
			positionClass: 'toast-bottom-right'
		});
	};

	const updateTask = async () => {
		await db.collection('tasks').doc(currentId).update(task);

		toastr.success('Product updated successfully', '', {
			timeOut: 3000,
			progressBar: true,
			positionClass: 'toast-bottom-right'
		});
	};

	const handleSubmit = () => {
		if (!editStatus) {
			addTask();
		} else {
			updateTask();
			editStatus = false;
		}
		clearFields();
	};

	const clearFields = () => {
		task = {
			name: "",
			description: ""
		};
	};

	const deleteTask = async (id) => {
		await db.collection('tasks').doc(id).delete();

		toastr.error('Product deleted successfully', '', {
			timeOut: 3000,
			progressBar: true,
			positionClass: 'toast-bottom-right'
		});
	};

	const editTask = async (currentTask) => {
		task.name = currentTask.name;
		task.description = currentTask.description;
		currentId = currentTask.id;

		editStatus = true;
	};

	const onCancel = () => {
		editStatus = false;
		clearFields();
	};
</script>

<form on:submit|preventDefault={handleSubmit} class="card card-body col-md-4 offset-md-4 mt-5">
	<div class="form-group">
		<input bind:value={task.name} type="text" placeholder="Write a new Task" class="form-control" required>
	</div>
	<div class="form-group">
		<textarea bind:value={task.description} rows="3" placeholder="Write a task description" class="form-control" required></textarea>
	</div>
	<button class="btn btn-primary">
		{#if !editStatus}
			Save Task
		{:else}
			Update Task
		{/if}
	</button>
	{#if editStatus}
		<button on:click={onCancel} class="btn btn-info mt-2">Cancel</button>
	{/if}
</form>

{#each tasks as task}
	<div class="card card-body mt-2 col-md-4 offset-md-4">
		<div class="d-flex justify-content-between">
			<h5>{task.name}</h5>
			<i on:click={editTask(task)} class="material-icons" style="vertical-align:middle; cursor: pointer;">edit</i>
		</div>
		<p>{task.description}</p>
		<button on:click={deleteTask(task.id)} class="btn btn-danger"><i class="material-icons" style="vertical-align:middle;">delete_forever</i></button>
	</div>
{/each}

<style>
</style>