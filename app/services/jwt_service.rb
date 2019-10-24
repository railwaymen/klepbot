# frozen_string_literal: true

require 'jwt'

class JwtService
  SECRET    = 'abcdef'
  ALGORITHM = 'HS256'

  def self.encode(payload:)
    JWT.encode(payload, SECRET, ALGORITHM)
  end

  def self.decode(token:)
    JWT.decode(token, SECRET, true, algorithm: ALGORITHM).first
  end
end
