import { Episode } from "@/app/lib/types";
import { Button, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@chakra-ui/react";


export default function EpisodeModal({ data, onClose }: { data: Episode; onClose: () => void; }) {
    return <ModalContent>
        <ModalHeader>{data.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
            Air date: {data.air_date}
        </ModalBody>

        <ModalFooter>
            <Button colorScheme='teal' mr={3} onClick={onClose}>
                Close
            </Button>
        </ModalFooter>
    </ModalContent>
}