'use client';

import { gql, useSuspenseQuery } from "@apollo/client";
import { Button, ButtonGroup, Flex, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import EpisodeModal from "./episode-modal";
import { Episode, Episodes } from "@/app/lib/types";

const GET_EPISODES_QUERY = gql`
  query GetEpisodes($page: Int) {
    episodes(page: $page) {
        info {
          pages
        }
        results {
          id
          name
          episode
          air_date
        }
      }
  }
`;

export default function EpisodesList() {
    const [currentPage, setCurrentPage] = useState(1);
    const { data } = useSuspenseQuery<Episodes>(GET_EPISODES_QUERY, {
        variables: {
            page: currentPage
        }
    });

    const onPrevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const onNextPage = () => {
        if (currentPage !== data.episodes.info.pages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const [selectedEpisodeId, setSelectedEpisodeId] = useState<string>();
    const selectedEpisode: Episode | undefined = useMemo(() => {
        return data.episodes.results.find(ep => ep.id === selectedEpisodeId)
    }, [data, selectedEpisodeId]);


    return (
        <>
            <Flex className="w-full" direction="column" gap={6}>
                <Text fontSize="x-large">All episodes of Rick and Morty</Text>
                <List>
                    {data.episodes.results.map((ep) => (
                        <ListItem className="w-full" key={ep.id}>
                            <Button justifyContent="start" maxWidth="100%" variant="link" onClick={() => setSelectedEpisodeId(ep.id)}>
                                <span className="truncate">{ep.episode} - {ep.name}</span>
                            </Button>
                        </ListItem>
                    ))}
                </List>
                <ButtonGroup className="mt-10">
                    <Button isDisabled={currentPage === 1} onClick={onPrevPage}>Prev</Button>
                    <Button isDisabled={currentPage === data.episodes.info.pages} onClick={onNextPage}>Next</Button>
                </ButtonGroup>
            </Flex>
            <Modal isOpen={Boolean(selectedEpisodeId)} onClose={() => setSelectedEpisodeId(undefined)}>
                <ModalOverlay />
                {selectedEpisode ? <EpisodeModal data={selectedEpisode} onClose={() => setSelectedEpisodeId(undefined)} /> : null}
            </Modal>
        </>
    )
}
