import { Form } from "@remix-run/react";
import { type ReactNode } from "react";
//import clsx from "clsx";

const modes = ['enter', 'exit'] as const;

type Mode = (typeof modes)[number]

type Props = {
  children?: ReactNode;
  mode: Mode;
};

export function PreviewModeButton({ children, mode }: Props) {
  if (!modes.includes(mode)) throw new Error('Invalid property mode');

  const method = mode === 'enter' ? 'GET' : 'POST';
  children = children ?? (mode === 'enter' ? 'Enter Preview Mode' : 'Exit Preview Mode');

	return (
		<div className="pointer-events-none fixed inset-0 flex h-screen w-screen items-end justify-center">
			<Form
				className="pointer-events-auto select-none"
				action="/resource/preview"
				method={method}
			>
				<button
					className="bg-black p-4 font-bold text-white"
					type="submit"
				>
					{ children }
				</button>
			</Form>
		</div>
	);
}
