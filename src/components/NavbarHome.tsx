import Button from "./Button";
import Logo from "./Logo";

export default function NavbarHome(){
    return (
        <nav className="bg-white">
            <div className="max-w-[1900px] flex justify-between mx-auto px-2 sm:px-6 lg:px-16">
                <Logo />
                <div className="flex items-center gap-4">
                        <Button variant="outline" size="small" className="text-primary">
                            Join Room
                        </Button>
                        <Button variant="background" size="small">
                            Create Room
                        </Button>
                </div>
            </div>
        </nav>
    )
}