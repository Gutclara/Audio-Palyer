import React, { useState, useRef, useEffect } from "react";

export function Home() {
	const [songList, setSongList] = useState([]);
	const [color, setColor] = useState([]);

	const obtenerCanciones = async () => {
		try {
			const res = await fetch(
				"https://assets.breatheco.de/apis/sound/songs"
			);
			const data = await res.json();
			//console.log(data);
			setSongList(data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		obtenerCanciones();
	}, []);

	const items = songList.map((element, id) => (
		<tr className={color[id]} key={id} onClick={() => cambiarCancion(id)}>
			<th scope="row">{element.id}</th>
			<td>{element.name}</td>
		</tr>
	));

	const [icono, setIcono] = useState(true);
	const [posActual, setPosActual] = useState(0);

	let cancion = useRef();

	const cambiarCancion = pos => {
		if (pos < 0) {
			pos = 0;
		} else if (pos == songList.length) {
			pos = 0;
		}
		let pintar = [];
		pintar[pos] = "activo";
		setColor(pintar);

		cancion.current.src =
			"https://assets.breatheco.de/apis/sound/" + songList[pos].url;
		cancion.current.play();
		setIcono(false);
		setPosActual(pos);
	};

	const playPausa = () => {
		if (cancion.current.paused) {
			cancion.current.play();
			setIcono(false);
		} else if (!cancion.current.paused) {
			cancion.current.pause();
			setIcono(true);
		}
	};

	return (
		<div>
			<table className="table table-dark">
				<tbody>{items}</tbody>
			</table>
			<audio ref={cancion} src="" />

			<br></br>
			<br></br>

			<nav className="navbar navbar-light bg-dark fixed-bottom d-flex justify-content-center">
				<div className="navbar-brand mb-0 h1">
					<i
						className="fas fa-step-backward mr-2"
						onClick={() => cambiarCancion(posActual - 1)}></i>
					<i
						className={icono ? "fas fa-play" : "fas fa-pause"}
						onClick={() => playPausa()}></i>
					<i
						className="fas fa-step-forward ml-2"
						onClick={() => cambiarCancion(posActual + 1)}></i>
				</div>
			</nav>
		</div>
	);
}
