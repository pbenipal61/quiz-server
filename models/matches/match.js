class Match {
    constructor(id, creator, matchType, otherParticipants, origin) {
        this.id = id;
        this.creator = creator;
        this.matchType = matchType;
        this.otherParticipants = otherParticipants;
        this.origin = origin;
    }


    getId() {
        return this.id;
    }
    setId(id) {
        this.id = id;
    }
    getCreator() {
        return this.creator;
    }
    setCreator(creator) {
        this.creator = creator;
    }
    getMatchType() {
        return this.matchType;
    }
    setMatchType(matchType) {
        return this.matchType = matchType;
    }
    getOtherParticipants() {
        return this.otherParticipants;
    }
    setOtherParticipants(otherParticipants) {
        this.otherParticipants = otherParticipants;
    }
    setOrigin(origin) {
        return this.origin = origin;
    }
    getOrigin() {
        return this.origin;
    }


}

module.exports = Match;