import React, { useEffect, useState, useCallback } from "react";
import Navigation from "../navigation/Navigation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa";
import GradientBackground from "../background/GradientBackground";
import { timeAgo } from "../../config/helper";
import PersonalChatChat from "../PersonalChat/PersonalChatChat";

function ChatDropDown() {
    const [openDropdown, setOpenDropdown] = useState('personalChat');
    const [personalChats, setPersonalChats] = useState([]);
    const [filteredPersonalChats, setFilteredPersonalChats] = useState([]);
    const [member2Id, setMember2Id] = useState("");
    const [member2Name, setMember2Name] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [isMember, setIsMember] = useState(null);
    const [currentUserId, setCurrentUserId] = useState("");
    const [personalChatOpen, setPersonalChatOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        if (!username) navigate("/login");
        setCurrentUserId(userId);
    }, [navigate]);

    const toggleDropdown = (dropdown) => {
        setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
        setSearchTerm("")
    };


    const fetchPersonalChat = async () => {
        const response = await axios.get(`http://localhost:8080/api/v1/personal_chat/all_personal_chats/${currentUserId}`)
        console.log(response.data);
        const sortedPersonalChat = response.data.sort((a, b) => {
            const latestA = a.messages?.length
                ? new Date(a.messages[a.messages.length - 1].timestamp).getTime()
                : 0;
            const latestB = b.messages?.length
                ? new Date(b.messages[b.messages.length - 1].timestamp).getTime()
                : 0;
            return latestB - latestA;
        });
        setFilteredPersonalChats(sortedPersonalChat);
        setPersonalChats(sortedPersonalChat);

    }

    useEffect(() => {
        if (openDropdown === "personalChat") {
            fetchPersonalChat();
        }
    }, [openDropdown]);

    const handlePersonalChatClick = (username, id) => {
        setMember2Id(id);
        setMember2Name(username);
    };

    useEffect(() => {
        if (member2Id && member2Name) {
            setPersonalChatOpen(true);
        }
    }, [member2Id, member2Name]);

    const debouncedSearch = useCallback(
        debounce((query) => {
            const filteredChats = personalChats.filter((chat) =>
                chat.githubUserName.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredPersonalChats(filteredChats);
        }, 300),
        [personalChats]
    );

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event.target.value);
    };

    return (
        <GradientBackground>
            <div className="flex flex-col h-screen text-white">
                <div className="fixed top-0 left-0 w-full z-50">
                    <Navigation />
                </div>

                <div className="flex flex-1 pt-20">
                    <div className="w-1/4 p-4 border-r bg-gray-900 border-gray-700 h-[calc(100vh-4rem)]">
                        <div className="space-y-3">
                            <div>
                                <button
                                    className="w-full text-left p-3 bg-gray-800 shadow-lg rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-700 transition-all"
                                    onClick={() => toggleDropdown("personalChat")}
                                >
                                    Personal Chat
                                    {openDropdown === "personalChat" ? <FaChevronUp /> : <FaChevronDown />}
                                </button>
                                {openDropdown === "personalChat" && (
                                    <div className="space-y-3 max-h-[60vh] overflow-y-auto">
                                        {filteredPersonalChats.length > 0 ? (
                                            filteredPersonalChats.map((personalChat) => (
                                                <div
                                                    key={personalChat.id}
                                                    className="p-3 bg-gray-700 shadow-lg rounded-lg flex items-center cursor-pointer hover:bg-gray-600 transition-all"
                                                    onClick={() => handlePersonalChatClick(personalChat.githubUserName, personalChat.id)}
                                                >
                                                    <img
                                                        src={`https://github.com/${personalChat.githubUserName}.png`}
                                                        alt={personalChat.githubUserName}
                                                        className="w-12 h-12 rounded-full object-cover mr-3"
                                                    />
                                                    <div>
                                                        <h3 className="text-md font-bold text-gray-200">{personalChat.githubUserName}</h3>
                                                        <div className="text-sm text-gray-400">
                                                            {personalChat.messages?.length > 0 ? (
                                                                <>
                                                                    <span className="font-semibold text-white">
                                                                        {personalChat.messages[personalChat.messages.length - 1]?.sender || "Unknown"}:
                                                                    </span>{" "}
                                                                    {personalChat.messages[personalChat.messages.length - 1]?.content || "No content"} •{" "}
                                                                    <span className="text-gray-500">
                                                                        {timeAgo(personalChat.messages[personalChat.messages.length - 1]?.timestamp)}
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                "No messages yet"
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-400">No Personal Chats found.</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-3/4 flex flex-col h-[calc(100vh-4rem)] text-center overflow-hidden justify-center">
                        {openDropdown === "personalChat" ? (
                            personalChatOpen ? (
                                <PersonalChatChat memberId={member2Id} memberName={member2Name} />
                            ) : (
                                <p className="text-lg text-gray-500">Select a Personal chat to continue</p>
                            )
                        ) : null}
                    </div>

                </div>
            </div>
        </GradientBackground>
    );
}

export default ChatDropDown;
