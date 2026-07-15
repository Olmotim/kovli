import Image from "next/image";

type CampoAvatarProps = {
    avatarActualUrl?: string;
};

export default function CampoAvatar({ avatarActualUrl }: CampoAvatarProps) {
    return (
        <div>
            <label htmlFor="avatar" className="mb-1 block text-sm font-semibold text-chocolate">
                Avatar <span className="ml-1 font-normal text-chocolate/50">(opcional)</span>
            </label>
            {avatarActualUrl && (
                <Image
                    src={avatarActualUrl}
                    alt="Tu avatar actual"
                    width={96}
                    height={96}
                    className="mb-2 h-24 w-24 rounded-full object-cover"
                />
            )}
            <input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                className="block w-full text-sm text-chocolate file:mr-4 file:rounded-sm file:border-0 file:bg-chocolate file:px-4 file:py-2 file:text-sm file:font-semibold file:text-crema hover:file:bg-apricot"
            />
            {avatarActualUrl && (
                <p className="mt-1 text-sm text-chocolate/60">
                    Sube una nueva foto para sustituir la actual.
                </p>
            )}
        </div>
    );
}
